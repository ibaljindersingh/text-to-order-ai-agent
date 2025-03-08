import  {cloudEvent} from '@google-cloud/functions-framework';
import {StorageObjectData} from '@google/events/cloud/storage/v1/StorageObjectData';
import {CloudEvent} from '@google-cloud/functions-framework/build/src/functions';


cloudEvent('imageUploadTrigger',(cloudEvent:CloudEvent<StorageObjectData>)=>{

    const fileData=cloudEvent.data;
    const bucketName=fileData?.bucket;
    const fileName = fileData?.name;

    console.log(`New file uploaded: ${fileName} in bucket: ${bucketName}`);
})

