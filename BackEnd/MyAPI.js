var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(6789, function () {
    console.log("Server is running...")
})

const { db } = require('./config/admin')

app.get("/api/get", async (req, res) => {
    const productRef = db.collection('Products');
    try {
        productRef.get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            console.log(items);
            res.status(201).json(items);
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

app.get("/api/getDetail/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const productRef = db.collection('Products').doc(id);
        productRef.get().then((snapshot) => {
            const items = snapshot.data()     
            console.log(items);
            res.status(201).json(items);
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
});


app.post("/api/create", (req, res) => {
    const { Name, Image, Price } = req.body;
    try {
        const productRef = db.collection('Products').doc();
        const product = {
            Name,
            Image,
            Price
        };
        productRef.set(product);
        res.status(200).send({ message: 'Add Successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.put("/api/update/:id", async (req, res) => {
    const { body: { Name, Image, Price }, params: { id } } = req;
    try {
        const productRef = db.collection('Products').doc(id);
        const currentData = (await productRef.get()).data() || {};
        const product = {
            Name: Name || currentData.Name,
            Image: Image || currentData.Image,
            Price: Price || currentData.Price
        };
        console.log(currentData.name)
        await productRef.update(product).catch((error) => {
            return res.status(400).json({
                status: 'error',
                message: error.message,
            });
        });

        return res.status(200).json({
            status: 'success',
            message: 'Updated Successfully',
            data: product,
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.delete("/api/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const productRef = db.collection('Products').doc(id);

        await productRef.delete().catch((error) => {
            return res.status(400).json({
                status: 'error',
                message: error.message,
            });
        });

        return res.status(200).json({
            status: 'success',
            message: 'Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});