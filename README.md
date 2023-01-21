# drc_task_nodejs


# multiple image upload
post method
http://localhost:5000/product/add-image/:id
![My animated logo](demo_image/Screenshot_4.png)



user table
name 
mobile
password
role => admin, user
createAt
updatedAt


product table
id
name
size
color
price
quantity

order table
id
user_id
product_id
order_code
order_date
require_date
shipped_date
order_status => pending, cancle, shipped, complated


images
id 
product_id
image