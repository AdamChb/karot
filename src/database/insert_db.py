import os
import requests
import json
import mysql.connector

def APIIngerdientCall():
    """Call the API and return the list of all ingredients in a list format"""

    # API link to get all ingredients
    link_ingredients = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    text_ingredients = requests.request("GET", link_ingredients)
    ingredients = json.loads(text_ingredients.text)

    # Return a list of all ingredients name
    list = []
    for ingredient in ingredients["meals"]:
        list.append(ingredient["strIngredient"])
    return list


def APIMealCall(letter):
    """Call the API and return the list of all meals starting with the letter "letter"
    in a dict format, with the name, category, steps, link of the image of the recipe, and
    a map of all ingredients required"""

    # API link to get all ingredients
    link_meals = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
    text_meals = requests.request("GET", link_meals)
    meals = json.loads(text_meals.text)

    # Return a list of all meals with :
    # - name
    # - category
    # - steps
    # - link of the image
    # - map of all ingredients required

    list = []
    if meals["meals"] is not None:
        for meal in meals["meals"]:
            list.append({"name":meal["strMeal"],
                         "category":meal["strCategory"],
                         "steps":meal["strInstructions"],
                         "image":meal["strMealThumb"],
                         "ingredients":{}})
            
            # Add all ingredients required for the recipe
            count = 2

            # First ingredient, mandatory
            ingredient = (meal["strIngredient1"], meal["strMeasure1"])
            list[-1]["ingredients"][ingredient[0]] = ingredient[1]

            # Other ingredients, if it exists
            while count != 20 and meal["strIngredient" + str(count)] != "":
                ingredient = (meal["strIngredient"+str(count)], meal["strMeasure"+str(count)])
                list[-1]["ingredients"][ingredient[0]] = ingredient[1]
                count += 1
    return list


def insertIngredient(list):
    """Insert the ingredient from the API Call "list" into the DB
    /!\ THE DB MUST BE CREATED ON YOUR COMPUTER BEFORE USING THIS FUNCTION /!\ """


    db = mysql.connector.connect(
        host="localhost",
        user="karot_root", # INSERT YOUR USER NAME
        password="efreikarot240", # INSERT YOUR PASSWORD
        database="karot" # INSERT YOUR DATABASE NAME
    )
    cursor = db.cursor()
    for ingredient in list :
        cursor.execute("INSERT INTO Ingredient (Name_Ingredient) VALUES (%s);", [ingredient])
    db.commit()
    db.close()
    return 0

def insertRecipe(list):
    """Insert the recipes from the API Call "list" into the DB, along with the ingredients required
    in the To_Require Table
        /!\ THE DB MUST BE CREATED ON YOUR COMPUTER BEFORE USING THIS FUNCTION /!\ """
    db = mysql.connector.connect(
        host="localhost",
        user="karot_root", # INSERT YOUR USER NAME
        password="efreikarot240", # INSERT YOUR PASSWORD
        database="karot" # INSERT YOUR DATABASE NAME
    )
    cursor = db.cursor()
    for recipe in list :

        # Insertion of the recipe
        cursor.execute("INSERT INTO Recipe (Name_Recipe, Category, Steps, Image, Id_Creator) VALUES (%s, %s, %s, %s, %s);",
                       [recipe["name"], recipe["category"], recipe["steps"], recipe["image"], 1])

        # Get the id of the recipe inserted
        cursor.execute("SELECT LAST_INSERT_ID() FROM Recipe")
        id_recipe = cursor.fetchall()[0][0]

        # Insertion of the ingredients required for the recipe
        for ingredient, quantity in recipe["ingredients"].items():
            cursor.execute("SELECT Id_Ingredient FROM Ingredient WHERE Name_Ingredient = %s", [ingredient])
            id_ingredient = cursor.fetchall()

            # Existence check, in case the ingredient is not in the database (some ingredients from the API are empty strings)
            if id_ingredient :
                id_ingredient = id_ingredient[0][0]

                # Insertion of the ingredient in the To_Require Table IF it does not exist
                try : cursor.execute("INSERT INTO To_Require (Id_Ingredient, Id_Recipe, Quantity) VALUES (%s, %s, %s)",
                               [id_ingredient, id_recipe, quantity])
                    
                # ELSE update the quantity of the ingredient required (the API sometimes gives the same ingredient multiple times)
                except :
                    cursor.execute("UPDATE To_Require SET Quantity = %s WHERE Id_Ingredient = %s AND Id_Recipe = %s",
                                   [quantity, id_ingredient, id_recipe])

    db.commit()
    db.close()
    return 0

def getlinkImage(letter, number):
    '''Return the localpath of the image of the recipe'''
    new_path = "img/" + letter + "/" + letter + str(number) + ".jpg"
    return new_path

def saveImagesRecipes(letter, number, link):
    '''Save the images in the correct folder if it exists, creates the folder otherwise'''

    # Localpath where the images are saved
    new_path = getlinkImage(letter, number)
    if link != "":
        image = requests.get(link).content
        if not os.path.exists("img") :
            os.mkdir("img")
        if not os.path.exists("img/"+letter):
            os.mkdir("img/"+letter)
        file = open(new_path, "wb")
        file.write(image)
        file.close()
    return new_path

def doAll():
    """Call all the function needed to insert into the database"""

    # Get the ingredients and insert them into the database
    insertIngredient(APIIngerdientCall())

    # For each letter of the alphabet, get the recipes and insert them into the database
    for i in range(97, 123):
        letter = chr(i)
        meals = APIMealCall(letter)
        for j in range(len(meals)):
            meals[j]["image"] = saveImagesRecipes(letter, j, meals[j]["image"])
        insertRecipe(meals)


if __name__ == "__main__":
    doAll()