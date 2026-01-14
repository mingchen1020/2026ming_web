var express = require("express");
var cors = require("cors"); // 加入 cors
var path = require("path");
var fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var DB = require("nedb-promises");

var server = express();

// 1. 基礎設定
server.use(cors()); // 允許跨來源請求，這樣 5500 埠才能傳資料給 3000 埠
server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(fileUpload({
    limits: { fileSize: 2 * 1024 * 1024 }, // 限制 2MB
    createParentPath: true // 自動建立不存在的資料夾（如 upload）
}));

// 2. 資料庫設定
var ContactDB = DB.create(path.join(__dirname, "Contact.db"));
var ServiceDB = DB.create(path.join(__dirname, "Service.db"));
var PorfolioDB = DB.create(path.join(__dirname, "Porfolio.db"));

// 3. 路由設定
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "fh.html"));
});

// 聯絡表單處理
server.post("/contact", (req, res) => {
    // 先將表單文字資料存入 NeDB
    ContactDB.insert(req.body)
        .then(result => {
            // 檢查是否有檔案上傳
            if (req.files && req.files.myFile1) {
                var upFile = req.files.myFile1;
                // 設定存檔路徑：public/upload/檔名
                var savePath = path.join(__dirname, "public", "upload", upFile.name);

                upFile.mv(savePath, (err) => {
                    if (err) {
                        console.error("檔案移動失敗:", err);
                        return res.status(500).json({ success: false, message: "資料已存，但檔案上傳失敗" });
                    }
                    res.json({ success: true, message: "✅ 資料與檔案均上傳成功！" });
                });
            } else {
                res.json({ success: true, message: "✅ 資料已成功存入資料庫（無附件）" });
            }
        })
        .catch(err => {
            console.error("資料庫錯誤:", err);
            res.status(500).json({ success: false, message: "❌ 資料庫寫入失敗" });
        });
});

// 啟動伺服器
server.listen(3000, () => {
    console.log("------------------------------------------");
    console.log("🚀 伺服器已啟動！");
    console.log("🔗 本地網址: http://localhost:3000");
    console.log("📂 檔案將存放在: public/upload/");
    console.log("------------------------------------------");
});
