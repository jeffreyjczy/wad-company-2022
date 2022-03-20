// var express = require("express");
// var router = express.Router();
// const mongoose = require("mongoose");
// var Quotation = require("../db/models/quotations");

/* GET quotations listing. */
// router.get("/", (req, res, next) => {
//     Quotation.find({}, (err, result) => {
//         if (err) {
//             console.debug("Hey Look! Error", err);
//             res.json(err);
//         } else {
//             // console.log(res);
//             res.json(result);
//         }
//     });
// });

//Create new quotation
// router.post("/", (req, res, next) => {
//     console.debug(req.body);
//     const data = req.body;
//     const quotation1 = new Quotation({
//         product: data.product,
//         price: data.price,
//         quantity: data.quantity
//     });
//     quotation1.save((err, newInstance) => {
//         if (err) {
//             console.error("Hey look, Error!", err);
//             res.json(err);
//         } else {
//             res.json(newInstance);
//         }
//     });
// });

// router.delete("/:id", (req, res, next) => {
//   const id = req.params['id']
//   // const id = req.body._id;
//   console.log("id delete", id)
//   console.debug('Product ID to delete',id);
//   Product.findByIdAndDelete(id, (err, doc) => {
//     if (err) {
//       console.error("Hey look, Error!", err);
//       res.json(err);
//     } else {
//       res.status(200).json(doc);
//     }
//   });
// });

// router.put("/", async (req, res, next) => {
//   console.debug(req.body);
//   const data = req.body;
//   const id = data._id;
//   delete data._id;
//   console.debug(data);

//   Product.findByIdAndUpdate(id, data, (err, doc) => {
//     if (err) {
//       console.error("Hey look, Error!", err);
//       res.json(err);
//     } else {
//       res.status(200).json(doc);
//     }
//   });

// });
// module.exports = router;
