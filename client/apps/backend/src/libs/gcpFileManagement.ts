import { Storage } from '@google-cloud/storage';
import dotenv from "dotenv";

dotenv.config();

// GCP Storage Config
const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.KEYFILE_PATH
});
const bucketName: string = process.env.BUCKET_NAME as string;
const bucket = storage.bucket(bucketName);

const uploadFile = async (filePath: string) => {
    try {
        const uploadedFile = await bucket.upload(filePath, {
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000'
            }
        });
        return uploadedFile[0].metadata.name;
    } catch (error) {
        throw error;
    }
};

const getSignedUrl = async (fileName: string) => {
    try {
        const options: any = {
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60, // one hour
        };

        // Get a signed URL for the file
        const [url] = await bucket.file(fileName)
            .getSignedUrl(options);
        return url;
    } catch (error) {
        throw error;
    }
};

export { getSignedUrl, uploadFile };
