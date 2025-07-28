/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDropzone } from 'react-dropzone'
import Heading from './heading'
const HandleGetFileFromStorage = ({
  onFileChange
}: {
  onFileChange: (file: File | null) => void
}) => {
  const onDrop = React.useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles) {
        const file = acceptedFiles[0]
        setFile(file)
        onFileChange(file)
      }
    },
    [onFileChange]
  )
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': []
    }
  })
  console.log(fileRejections)
  const [file, setFile] = React.useState<any>(null)
  return (
    <div className="top-0 mx-auto mb-10 size-48 lg:sticky ">
      {/* on large device the upload file stick to the top  */}
      <Heading className="text-center">Photo</Heading>
      <div
        {...getRootProps({
          className:
            'flex items-center justify-center mx-auto border-black rounded-sm shadow size-48 place-items-center ring-1 ring-gray-300  mx-auto mb-6 cursor-pointer'
        })}
      >
        <input {...getInputProps()} />
        {!file ? (
          <>
            <p>
              drag and drop or
              <br />
              click to select
            </p>
          </>
        ) : (
          <img
            className="size-full object-fill"
            src={URL.createObjectURL(file)}
          ></img>
        )}
      </div>
    </div>
  )
}

export default HandleGetFileFromStorage
