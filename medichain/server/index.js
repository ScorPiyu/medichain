const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

let userinfo = JSON.parse(fs.readFileSync("./users.json", "utf8"));
let docInfo = JSON.parse(fs.readFileSync("./doctors.json", "utf8"));
let docAccInfo = JSON.parse(fs.readFileSync("./doctors-acc.json", "utf8"));
let userAccInfo = JSON.parse(fs.readFileSync("./users-info.json", "utf8"));
const nodeApp = express();
nodeApp.use(cors());
nodeApp.use(express.json());

nodeApp.get("/getDoctors", (req, res) => {
  console.log("hello");
  res.json(require(__dirname + "/doctors.json"));
});

nodeApp.post("/userLogin", (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  let user = userinfo.find((u) => u.email === email);
  console.log("bruh");
  if (user) {
    if (user.password === pass) {
      return res.json({ UserLogin: "Success", name: user.name });
    }
    return res.json({ userLogin: "Wrong Pass" });
  }
  return res.json({ userLogin: "Wrong Email" });
});

nodeApp.post("/doctorLogin", (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  let user = docAccInfo.find((u) => u.email === email);
  console.log("hello");
  console.log(user);
  console.log(user);
  if (user) {
    if (user.password === pass) {
      console.log("hello");
      return res.json({ DoctorLogin: "Success", name: user.name });
    }
    return res.json({ DoctorLogin: "Wrong Pass" });
  }
  return res.json({ DoctorLogin: "Wrong Email" });
});

nodeApp.post("/getAppointments", (req, res) => {
  let email = req.body.email;
  let user = docInfo.find((u) => u.email === email);
  // console.log(user)
  console.log({
    upcoming: user.appointments,
    completed: user.pastAppointments,
    cancelled: user.cancelledAppointments,
  });

  return res.json({
    upcoming: user.appointments,
    completed: user.pastAppointments,
    cancelled: user.cancelledAppointments,
  });
});

nodeApp.post("/er", (req, res) => {
  console.log("hiiiii");
  let name = req.body.name;
  let id = docInfo.find((obj) => obj.name === name).id;
  let ers = require("./er.json");
  if (ers.includes(id)) {
    console.log("found");
    return res.json({ found: true });
  }
  console.log("not found");

  return res.json({ found: false });
});

const path = require("path");

nodeApp.post("/getErPatients", (req, res) => {
  let doctorName = req.body.doctor;
  console.log(doctorName);
  let id = docInfo.find((d) => d.name === doctorName).id;

  const filePath = path.join(__dirname, "er-details.json");
  let ers = JSON.parse(fs.readFileSync(filePath, "utf8"));
  console.log(ers);
  let patients = ers.find((e) => Object.keys(e)[0] === id)[id];
  console.log("patients" + patients);
  return res.json({ patients: patients });
});
nodeApp.get("/availableEr", (req, res) => {
  console.log("AAAAAAH");
  const filePath = path.join(__dirname, "er.json");
  let ers = JSON.parse(fs.readFileSync(filePath, "utf8"));
  console.log(ers.length);
  let response = ers.map((e) => docInfo.find((d) => d.id === e));

  return res.json(response);
});

nodeApp.post("/disableEr", (req, res) => {
  const name = req.body.name;
  const doctor = docInfo.find((obj) => obj.name === name);

  const filePath = path.join(__dirname, "er.json");
  let ers = JSON.parse(fs.readFileSync(filePath, "utf8"));
  ers = ers.filter((o) => o !== id);
  fs.writeFileSync(filePath, JSON.stringify(ers, null, 2));
  return res.status(200).json({ success: true, ers }); // Send response!
});

nodeApp.post("/enableEr", (req, res) => {
  const name = req.body.name;
  const doctor = docInfo.find((obj) => obj.name === name);

  const filePath = path.join(__dirname, "er.json");
  let ers = JSON.parse(fs.readFileSync(filePath, "utf8"));
  ers.push(id);
  fs.writeFileSync(filePath, JSON.stringify(ers, null, 2));
  return res.status(200).json({ success: true, ers });
});

nodeApp.post("/toggleEr", (req, res) => {
  try {
    const name = req.body.name;
    const doctor = docInfo.find((obj) => obj.name === name);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const id = doctor.id;

    // Read and parse er.json directly (avoid require for dynamic files)
    const filePath = path.join(__dirname, "er.json");
    let ers = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (ers.includes(id)) {
      ers = ers.filter((o) => o !== id);
    } else {
      ers.push(id);
    }

    // Write the updated array back
    fs.writeFileSync(filePath, JSON.stringify(ers, null, 2));

    console.log(ers);

    return res.status(200).json({ success: true, ers }); // Send response!
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

nodeApp.post("/getAppointmentsUser", (req, res) => {
  let email = req.body.email;
  let user = userAccInfo.find((u) => u.email === email);
  let id = require("./iddoc.js");
  // console.log(user.appointments)

  let appointments = user.appointments.map((obj) => {
    let idHere = id.find((i) => Object.keys(i)[0] === obj[3]);
    let doctorInfo = idHere[Object.keys(idHere)[0]];
    return [...obj, doctorInfo]; // returns a new array
  });

  let past = user.pastAppointments.map((obj) => {
    let idHere = id.find((i) => Object.keys(i)[0] === obj[3]);
    let doctorInfo = idHere[Object.keys(idHere)[0]];
    return [...obj, doctorInfo]; // returns a new array
  });

  let cancelled = user.cancelledAppointments.map((obj) => {
    let idHere = id.find((i) => Object.keys(i)[0] === obj[3]);
    let doctorInfo = idHere[Object.keys(idHere)[0]];
    return [...obj, doctorInfo]; // returns a new array
  });

  // let appointments = user.appointments.map((obj) => obj[Object.keys(obj)[0]].push(require('./iddoc').find(o => Object.keys(o)[0] === obj[Object.keys(obj)[0]])))
  return res.json({
    upcoming: appointments,
    completed: past,
    cancelled: cancelled,
  });
});

nodeApp.post("/bookEr", async (req, res) => {
  console.log("booker");
  console.log(req.body);
  let name = req.body.name;
  let doctor = req.body.doctor;
  let doctorName = docInfo.find((d) => d.id === doctor).name;
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: name,
        },
        unit_amount: 50000,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3002/emergency/3/${encodeURIComponent(
      doctorName
    )}_____${encodeURIComponent(name)}`,
    cancel_url: "http://localhost:3002/failure",
  });
  return res.json({ id: session.id });
});

nodeApp.post("/updateEr", async (req, res) => {
  let name = req.body.name;
  let docc = req.body.doc;
  let doctor = docInfo.find((d) => d.name === docc).id;
  let ers = JSON.parse(fs.readFileSync("./er-details.json", "utf8"));
  let doc = ers.find((e) => Object.keys(e)[0] === doctor);
  const key = Object.keys(doc)[0];

  if (!doc[key].includes(name)) {
    doc[key].push(name);
  }

  let final = ers.map((e) => (Object.keys(e)[0] === doctor ? doc : e));
  fs.writeFileSync("./er-details.json", JSON.stringify(final, null, 2));
});

nodeApp.post("/bookAptPay", async (req, res) => {
  console.log("pay");

  let date = req.body.date;
  let time = req.body.time;
  let name = req.body.name;
  let mode = req.body.mode;
  let email = req.body.email;
  let doctor = req.body.id;

  // let apt = [date, time, name, mode, email];

  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: `${doctor}_${mode}_${date}_${time}`,
        },
        unit_amount: 50000,
      },
      quantity: 1,
    },
  ];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3002/success/${encodeURIComponent(
      date
    )}_${encodeURIComponent(time)}_${encodeURIComponent(
      name
    )}_${encodeURIComponent(mode)}_${encodeURIComponent(
      email
    )}_${encodeURIComponent(doctor)}`,
    cancel_url: "http://localhost:3002/failure",
  });
  return res.json({ id: session.id });
});
nodeApp.post("/bookAppointment", async (req, res) => {
  let date = req.body.date;
  let time = req.body.time;
  let name = req.body.name;
  let mode = req.body.mode;
  let email = req.body.email;
  let doctor = req.body.id;
  let apt = [date, time, name, mode, email];

  // const lineItems = [{
  //     price_data:{
  //         currency : "usd",
  //         product_data : {
  //             name : `${doctor}_${mode}_${date}_${time}`
  //         },
  //         unit_amount : 100
  //     }
  // }];
  // const session = await stripe.checkout.sessions.create({
  //     payment_method_types:['card'],
  //     line_items : lineItems,
  //     mode : "payment",
  //     success_url : "http://localhost:3000/success",
  //     cancel_url : "http://localhost:3000/failure"
  // })

  // let apt = [date, time, name, mode, email];
  let doc = docInfo.find((u) => u.id === doctor);
  let slotFound = false;
  // console.log(apt)
  // Find the correct date slot and remove the booked time
  for (let slotObj of doc.timeSlots) {
    let i = 0;
    const key = Object.keys(slotObj)[0];

    if (key === date) {
      const times = slotObj[date];
      const index = times.indexOf(time);

      if (index !== -1) {
        times.splice(index, 1); // remove booked time
        slotFound = true;
        if (slotObj[date].length <= 0) {
          doc.timeSlots.splice(i, 1);
        }
        break;
      }
    }
    i++;
  }

  // console.log(doc.timeSlots);
  doc.appointments.push(apt);
  docInfo = docInfo.map((obj) => (Object.keys(obj)[0] == doctor ? doc : obj));
  console.log(docInfo[0].timeSlots);
  fs.writeFileSync("./doctors.json", JSON.stringify(docInfo));

  let apps = userAccInfo.find((u) => u.email === email);
  apps.appointments.push([date, time, mode, doctor]);

  userAccInfo.map((o) => (o.email === email ? apps : o));
  console.log(userAccInfo[0].appointments);

  fs.writeFileSync("./users-info.json", JSON.stringify(userAccInfo));

  return res.json({ hello: "there" });
  // console.log(doc);
});

nodeApp.listen(5000, () => {
  console.log("Server is running on 5000");
});
