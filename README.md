# drc_task_nodejs


# multiple image upload
Code for uploading multiple images:  <b>demo_image/index.html</b>
post method<br />
http://localhost:5000/product/add-image/:id<br />
<br />

![My animated logo](demo_image/Screenshot_4.png)

# env
JWT_KEY=XXXXXXXXX <br />
please add <b>JWT_KEY</b> in .env file


# user table
name <br />
mobile<br />
password<br />
role => admin, user<br />
createAt<br />
updatedAt<br />

<br />
<br />
<br />

# product table
id <br />
name<br />
size<br />
color<br />
price<br />
quantity<br />

# order table
id<br />
user_id<br />
product_id<br />
order_code<br />
order_date<br />
require_date<br />
shipped_date<br />
order_status => pending, cancle, shipped, complated<br />

<br />
<br />
<br />

# images
id <br />
product_id<br />
image<br />