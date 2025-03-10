import { Firestore } from "@google-cloud/firestore";

const db = new Firestore();
const groceryCollection = db.collection("grocery_store");

const sampleProducts = [
  { name: "Basmati Rice", sku: "RICE001", category: "Rice & Dal", price: 50.75, stock: 100.0, unit: "kg" },
  { name: "Toor Dal", sku: "DAL002", category: "Rice & Dal", price: 80.50, stock: 50.0, unit: "kg" },
  { name: "Chana Dal", sku: "DAL003", category: "Rice & Dal", price: 70.25, stock: 60.0, unit: "kg" },
  { name: "Moong Dal", sku: "DAL004", category: "Rice & Dal", price: 90.99, stock: 40.0, unit: "kg" },

  { name: "Cumin Seeds", sku: "SPC001", category: "Spices", price: 120.49, stock: 30.0, unit: "g" },
  { name: "Turmeric Powder", sku: "SPC002", category: "Spices", price: 90.00, stock: 40.0, unit: "g" },
  { name: "Coriander Powder", sku: "SPC003", category: "Spices", price: 85.75, stock: 45.0, unit: "g" },
  { name: "Red Chilli Powder", sku: "SPC004", category: "Spices", price: 95.50, stock: 35.0, unit: "g" },

  { name: "Aashirvaad Atta", sku: "FLR001", category: "Flour & Grains", price: 300.99, stock: 20.0, unit: "kg" },
  { name: "Fortune Sunflower Oil", sku: "OIL001", category: "Oils", price: 180.50, stock: 25.0, unit: "liter" },
  { name: "Mustard Oil", sku: "OIL002", category: "Oils", price: 150.25, stock: 30.0, unit: "liter" },

  { name: "Nestle Milk", sku: "DAI001", category: "Dairy", price: 60.10, stock: 50.0, unit: "liter" },
  { name: "Amul Butter", sku: "DAI002", category: "Dairy", price: 45.25, stock: 30.0, unit: "gram" },
  { name: "Paneer", sku: "DAI003", category: "Dairy", price: 250.75, stock: 15.0, unit: "kg" },
  { name: "Curd", sku: "DAI004", category: "Dairy", price: 50.99, stock: 20.0, unit: "liter" },

  { name: "Aloo (Potato)", sku: "VEG001", category: "Vegetables", price: 30.50, stock: 100.0, unit: "kg" },
  { name: "Pyaaz (Onion)", sku: "VEG002", category: "Vegetables", price: 40.25, stock: 80.0, unit: "kg" },
  { name: "Tomato", sku: "VEG003", category: "Vegetables", price: 35.75, stock: 90.0, unit: "kg" },
  { name: "Bhindi (Okra)", sku: "VEG004", category: "Vegetables", price: 45.50, stock: 70.0, unit: "kg" },

  { name: "Parle-G Biscuits", sku: "PKD001", category: "Packaged Goods", price: 10.99, stock: 200.0, unit: "packet" },
  { name: "Maggi Noodles", sku: "PKD002", category: "Packaged Goods", price: 25.75, stock: 100.0, unit: "packet" },
  { name: "Britannia Rusk", sku: "PKD003", category: "Packaged Goods", price: 45.99, stock: 50.0, unit: "packet" },
];

async function populateFirestore() {
  for (const product of sampleProducts) {
    await groceryCollection.doc(product.sku).set(product);
    console.log(`✅ Added: ${product.name} (${product.unit})`);
  }
  console.log("🎉 Firestore setup complete!");
}

populateFirestore().catch(console.error);
