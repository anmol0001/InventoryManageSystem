# Inventory Managing System

>### Creating a backend system to manage inventory and sales for a small shop. The system should allow users/retailers to add items to the inventory, create bills for sales transactions, and update inventory accordingly.

##
### Functionality

```bash
Users/Retailers should be able to
Add new items to the inventory.
Retrieve a list of all items in the inventory.
Create a bill for a sale transaction, specifying the items sold and quantities.
Retrieve a list of all bills.
Get details of a specific bill.
Update the inventory automatically when a bill is created (subtract sold items from the inventory)
```

### Navigate to a website 
##
```bash
https://inventorymanagesystem.onrender.com/
```
>NOTE: Although the site is live but due to render restrictions if there is no activity happening on site then it will go to sleep mode. So it's better to use localhost!
##

### Curl Requests
##
> Use below curl requests directly on Postman or any other app to use its CRUD functionality
##

#### Get all items from inventory.
```bash
curl --location 'http://localhost:8000/api/items'
```
##

#### Add a new item in the inventory.
```bash
curl --location 'http://localhost:8000/api/items' \
--header 'Content-Type: application/json' \
--data '{
    "itemName": "Keyboard",
    "description": "Mechanical gaming keyboard with RGB backlighting",
    "price": 99.99,
    "quantity": 20

  }

 '
```
##

#### Update an item in the inventory by name or ID using query parameters.
```bash
curl --location --request PUT 'http://localhost:8000/api/updateItems?type=name&identifier=keyboard' \
--header 'Content-Type: application/json' \
--data '{
    "price": "99.99",
    "quantity": "25"
}'
```
##

#### Delete an item from inventory using item ID.
```bash
curl --location --request DELETE 'http://localhost:8000/api/deleteItems/660188563baced74a38c8d20'
```
##

#### Get all bills from inventory.
```bash
curl --location 'http://localhost:8000/api/bills'
```
##

#### Creating the bill for sold items from inventory.
```bash
curl --location 'http://localhost:8000/api/bills' \
--header 'Content-Type: application/json' \
--data '{ 
  "customerName" :"rahul" ,
  "items": [
    {
      "itemName" : "laptop",
      "quantity": 3
    },
    {
      "itemName": "phone",
      "quantity": 5
    },
    {
      "itemName": "headphones",
      "quantity": 15
    }
  ]
}
'
```
##

#### Get specific bill details from inventory using bill ID.
```bash
curl --location 'http://localhost:8000/api/bills/66019950053f3ec55a680826'
```
##

>### NOTE: You can use your own port number or use the hosted site URL directly.
##

![bills](https://github.com/anmol0001/InventoryManageSystem/assets/78845555/62e340b4-dfe9-4e56-a4a8-99755828e149)
##

![delete](https://github.com/anmol0001/InventoryManageSystem/assets/78845555/26b1ac31-71d8-470a-927c-1ee1737695e7)
##
