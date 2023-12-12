import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = ({ addContact, initialContact }) => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (initialContact) {
            setValue('name', initialContact.name);
            setValue('email', initialContact.email);
            setValue('phone', initialContact.phone);
            setIsEditing(true);
        }
    }, [initialContact, setValue]);

    const onSubmit = (data) => {
        if (isEditing) {
            addContact({ ...data, id: initialContact.id });
        } else {
            addContact(data);
        }

        reset();
        setIsEditing(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-between'>
                <div className='flex space-x-6'>
                    <div>
                        <input
                            {...register('name', {
                                required: 'This field is required.',
                                maxLength: { value: 100, message: 'Max length is 100 characters.' },
                            })}
                            className='contactInput'
                            placeholder='Name'
                            type='text'
                        />
                        {errors?.name && <p className='text-[#F7AB0A] mt-1'>{errors.name.message}</p>}
                    </div>
                    <div>
                        <input
                            {...register('email', {
                                required: 'This field is required.',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address.',
                                },
                            })}
                            className='contactInput'
                            placeholder='Email'
                            type='email'
                        />
                        {errors?.email && <p className='text-[#F7AB0A] mt-1'>{errors.email.message}</p>}
                    </div>
                    <div>
                        <input
                            {...register('phone', {
                                required: 'This field is required.',
                            })}
                            className='contactInput'
                            placeholder='Phone'
                            type='tel'
                        />
                        {errors?.phone && <p className='text-[#F7AB0A] mt-1'>{errors.phone.message}</p>}
                    </div>
                </div>

                <button
                    type='submit'
                    className='bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg'
                >
                    {isEditing ? 'Update Contact' : 'Add Contact'}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
