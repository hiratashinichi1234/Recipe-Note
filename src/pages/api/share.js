import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer設定
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // ファイルサイズの制限を10MBに設定
});

// Next.jsの設定
export const config = {
    api: {
        bodyParser: false,
    },
};

// APIハンドラー
export default function handler(req, res) {
    if (req.method === 'POST') {
        upload.single('image')(req, res, function (err) {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ error: 'Error uploading file' });
            }

            console.log('Request body:', req.body);
            console.log('Uploaded file:', req.file);

            const { title, content } = req.body;
            const image = req.file;

            if (!image) {
                console.error('No image file uploaded');
                return res.status(400).json({ error: 'Image file is required' });
            }

            console.log('File saved to:', image.path);
            console.log('Title:', title);
            console.log('Content:', content);

            res.status(200).json({ message: 'Recipe posted successfully' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Method not allowed' });
    }
}
