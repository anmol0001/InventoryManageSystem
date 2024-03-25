![update](https://github.com/anmol0001/InventoryManageSystem/assets/78845555/df72439c-d5c7-4515-be47-860e43a1ddc2)# Inventory Managing System

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
Update the inventory automatically when a bill is created
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
![image](https://github.com/anmol0001/InventoryManageSystem/assets/78845555/4ef83d04-0753-48e2-8937-b982348984b1)
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
![create](https://github.com/anmol0001/InventoryManageSystem/assets/78845555/6e566540-6087-4f41-ae99-7ce93e46d6f2)
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
![update](https://github.com/anmol0001/InventoryManageSystem/assets/78845555/96a84fa3-12b7-4bb5-9aef-9efe717d23ed)
##

#### Delete an item from inventory.
```bash
curl --location --request DELETE 'http://localhost:8000/api/deleteItems/660188563baced74a38c8d20'
```
![delete](https://github.com/anmol0001/InventoryManageSystem/assets/78845555/60718386-2eeb-42c0-b693-30d7f3023075)
##



