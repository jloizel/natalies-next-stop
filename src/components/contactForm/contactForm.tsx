'use client';

import React, { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
import styles from './contactForm.module.css';
import { sendEmail } from '@/app/API';

// Define the schema using zod
// const formSchema = z.object({
//   name: z.string().min(2, { message: "This field cannot be left blank." }),
//   email: z.string().email({ message: "Email must be in proper format." }),
//   message: z.string().min(2, { message: "This field cannot be left blank." }),
//   file: z.instanceof(File).optional(), 
// });

// export type FormData = z.infer<typeof formSchema>;


interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FC = () => {
  const form = useRef<any>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [messageSent, setMessageSent] = useState<boolean>(false);


  const onSubmit = async (data: FormData) => {
    let hasError = false;
  
    // Validate name
    if (data.name.length < 2) {
      setError('name', { type: 'manual', message: 'This field cannot be left blank.' });
      hasError = true;
    }
  
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(data.email)) {
      setError('email', { type: 'manual', message: 'Email must be in proper format.' });
      hasError = true;
    }
  
    // Validate message
    if (data.message.length < 2) {
      setError('message', { type: 'manual', message: 'This field cannot be left blank.' });
      hasError = true;
    }
  
    if (hasError) return;
  
    // Create a new FormData instance
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    
    try {
      await sendEmail(formData);
      setMessageSent(true);
      reset(); 
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

  return (
    <form ref={form} onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      {!messageSent && (
        <div className={styles.form}>
            <div className={styles.inputContainer}>
              <div className={styles.inputTitle}>NAME</div>
              <input
                className={styles.input}
                type="text"
                {...register('name')}
              />
              {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputTitle}>EMAIL</div>
                <input
                  className={styles.input}
                  type="text"
                  {...register('email')}
                />
              {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>MESSAGE</div>
              <textarea
                className={styles.message}
                {...register('message')}
              />
            {errors.message && <p className={styles.errorMessage}>{errors.message.message}</p>}
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">Submit</button>
          </div>
        </div>
      )}
      {messageSent && (
        <div className={styles.successMessageContainer}>
          <div className={styles.successMessage}>
            Thank you for your message, I will be in contact as soon as possible!
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
