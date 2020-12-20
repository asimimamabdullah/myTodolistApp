// //jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const  mongoose = require("mongoose");
// // Uncommented because of mongoose has added
// // const date = require(__dirname + "/date.js");

// const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
// // Mongoose is added here {
// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

// const itemsSchema = {
//   name: String
// }



// const Item = mongoose.model("item", itemsSchema);

// const item1 = {
//   name: "Welcome this a mongoose todolist"
// }

// const item2 = {
//   name: "Hit the + button to add more todo items"
// }

// const item3 = {
//   name: "Hit nothing to delete a n item because you just can't"
// }

// const defaultItems = [item1, item2, item3];

// const listSchema = {
//   name: String,
//   items: [itemsSchema]
// }

// const List = mongoose.model("List", listSchema);

// const item4 = new Item({
//   name: "nothing",
// });


// //Uncommented because items already added

// // item4.save();
// // Item.insertMany(defaultItems, err => {
// //   if(err)
// //     console.log(err);
// //   else
// //     console.log("Successfull");
// // });


// //}
// // Uncommented because of mongoose has added
// // const items = ["Buy Food", "Cook Food", "Eat Food"];
// // const workItems = [];

// app.get("/", function(req, res) {
// // Uncommented because of mongoose has added
// // const day = date.getDate();

//   Item.find({}, (err, foundItems) => {
//     if(err)
//       console.log(err);
//     else{

//       if(foundItems.length === 0){
//         Item.insertMany(defaultItems, err => {
//           if(err)
//             console.log(err);
//           else
//             console.log("Successfull");
//         });
//         res.redirect("/");

//       }else{
//         res.render("list", {listTitle: "Today", newListItems: foundItems});
//       }
      
//     }
      
//   });


// });

// app.post("/", function(req, res){

//   const itemName = req.body.newItem;
//   const listName = req.body.list;
//   const item = new Item({
//     name: itemName
//   });
//   item.save();
//   res.redirect("/");


//   // Deleted Because there is no need of adding item into array because we have mongoose now 

//   // if (req.body.list === "Work") {
//   //   workItems.push(item);
//   //   res.redirect("/work");
//   // } else {
//   //   items.push(item);
//   //   res.redirect("/");
//   // }
// });

// app.post("/delete", (req, res) => {
//   const checkedItemId = req.body.checkBox;

//   console.log(checkedItemId);

//   Item.findOneAndDelete({_id:checkedItemId}, function(err) {
//     if(err)
//       console.log(err);
//     else
//       console.log("Successfully Deleted");
//       res.redirect("/");
//   });
// });

// app.get("/:customListName", (req, res) => {
//   console.log(req.params.customListName);
//   const customListName = req.params.customListName;

//   List.findOne({name: customListName}, (err, foundList) => {
//     if(!err){
//       if(!foundList){
//         //Creating a new List
//         const list = new List({
//           name: customListName,
//           items: defaultItems
//         });
//         list.save();
//         res.redirect("/" + customListName);
//       } else{
//         //show an existing list
//         res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
//       }
//     }
//   })
//   const list = new List({
//     name: customListName,
//     items: defaultItems
//   });
//   list.save();

// });


// // // we are using express params.. do you have any problem??

// // // app.get("/work", function(req,res){
// // //   res.render("list", {listTitle: "Work List", newListItems: workItems});
// // // });

// app.get("/about", function(req, res){
//   res.render("about");
// });

// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });












//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const  mongoose = require("mongoose");
const _ = require("lodash");
// Uncommented because of mongoose has added
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// Mongoose is added here {
mongoose.connect("mongodb+srv://asimimamabdullah:interNET123@cluster0.8iajr.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = {
  name: "Welcome this a mongoose todolist"
}

const item2 = {
  name: "Hit the + button to add more todo items"
}

const item3 = {
  name: "Hit nothing to delete a n item because you just can't"
}

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

const item4 = new Item({
  name: "nothing",
});


//Uncommented because items already added

// item4.save();
// Item.insertMany(defaultItems, err => {
//   if(err)
//     console.log(err);
//   else
//     console.log("Successfull");
// });


//}
// Uncommented because of mongoose has added
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {
// Uncommented because of mongoose has added
// const day = date.getDate();

  Item.find({}, (err, foundItems) => {
    if(err)
      console.log(err);
    else{

      if(foundItems.length === 0){
        Item.insertMany(defaultItems, err => {
          if(err)
            console.log(err);
          else
            console.log("Successfull");
        });
        res.redirect("/");

      }else{
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
      
    }
      
  });
});


app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  
  List.findOne({name: customListName}, (err, foundList) => {
    if(!err){
      if(!foundList){
        //Creating a new List
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else{
        //show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });
  const list = new List({
    name: customListName,
    items: defaultItems
  });
  // list.save();


});




app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;


  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    console.log("post: " + listName);
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      console.log("list: " + foundList);
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }

  // Deleted Because there is no need of adding item into array because we have mongoose now 

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkBox;
  const listName = req.body.listName;

  

  if(listName === "Today"){
    Item.findOneAndDelete({_id:checkedItemId}, function(err) {
      if(!err){
          console.log("Successfully Deleted");
          res.redirect("/");
        }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/" + listName);
        console.log("Deleted Item ID: " + checkedItemId);
      }
    });
  }

  
});



// we are using express params.. do you have any problem??

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT, function() {
  console.log("Server started successfully");
});

