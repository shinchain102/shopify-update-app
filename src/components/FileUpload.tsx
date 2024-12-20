import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, DropZone, Stack, Banner, Button } from '@shopify/polaris';
import { parseCSV } from '../utils/csvParser';
import { OrderUpdate } from '../types/order';

interface FileUploadProps {
  onFileProcessed: (orders: OrderUpdate[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      const orders = await parseCSV(file);
      onFileProcessed(orders);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  }, [onFileProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <Card sectioned>
      <Stack vertical>
        <DropZone accept="text/csv" {...getRootProps()}>
          <input {...getInputProps()} />
          <DropZone.FileUpload
            actionHint={
              isDragActive 
                ? "Drop the CSV file here"
                : "Upload a CSV file with order updates"
            }
          />
        </DropZone>
        <Banner status="info">
          CSV should include columns: Order ID, Status, Tracking ID (optional)
        </Banner>
      </Stack>
    </Card>
  );
};