"use client";

import { useRef, useState } from 'react';
import classes from './ImagePicker.module.css'
import Image from 'next/image';

export default function ImagePicker({label, name}) {

    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handleClick() {
        imageInput.current.click();
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (!file) {
            console.log("no file")
            setPickedImage(null)
            return;
        }

        console.log("file")

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        };

        fileReader.readAsDataURL(file);

    }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
            {!pickedImage && <p>No image selected yet.</p>}
            {pickedImage &&
            <Image
                src={pickedImage}
                alt="The image selected by the user."
                fill
            />
            }
        </div>
        <input
            className={classes.input}
            type="file"
            id={name} 
            accept="image/png, image/jpeg"
            name={name}
            ref={imageInput}
            onChange={handleImageChange}
            required
        />
        <button className={classes.button} type="button" onClick={handleClick}>
            Pick an Image
        </button>
      </div>
    </div>
  );
};