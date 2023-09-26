"use client"
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import FormField from './FormField';
import Button from './Button';
import CustomMenu from './CustomMenu';
import { departmentFilters } from '@/constant';
import { fetchToken, createNewSurvey, updateSurvey } from '@/lib/actions';
import { SessionInterface, SurveyFormState, SurveyInterface } from '@/common.types';

type Props = {
    type: string,
    session: SessionInterface,
    survey?: SurveyInterface
}

const SurveyForm = ({ type, session, survey }: Props) => {
    const router = useRouter()

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm] = useState<SurveyFormState>({
        title: survey?.title || "",
        description: survey?.description || "",
        image: survey?.image || "",
        githubUrl: survey?.githubUrl || "",
        category: survey?.category || "",
        futureEnhancement: survey?.futureEnhancement || "",
    })

    const handleStateChange = (fieldName: keyof SurveyFormState, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange("image", result)
        };
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setSubmitting(true)

        const { token } = await fetchToken()

        try {
            if (type === "create") {
                await createNewSurvey(form, session?.user?.id, token)

                router.push("/")
            }

            if (type === "edit") {
                await updateSurvey(form, survey?.id as string, token)

                router.push("/")
            }

        } catch (error) {
            alert(`Failed to ${type === "create" ? "create" : "edit"} a Survey Form. Try again!`);
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20" alt="image"
                        fill
                    />
                )}
            </div>

            <FormField
                title="Research Title"
                state={form.title}
                placeholder="Enter your Title"
                setState={(value) => handleStateChange('title', value)}
                isRequired={true}
            />

            <FormField
                title='About this Research and Survey'
                state={form.description}
                placeholder="Enter project description."
                isTextArea
                setState={(value) => handleStateChange('description', value)}
                isRequired={true}
            />
            <FormField
                title='Now caption your survey, this will be seen first by others 😉 (Make it short)'
                state={form.futureEnhancement}
                placeholder="Unlock Your College Experience: Share Your Story!"
                isTextArea
                setState={(value) => handleStateChange('futureEnhancement', value)}
                isRequired={true}
            />

            <FormField
                isTextArea
                title="Form Url (Eg:Google Form Url)"
                state={form.githubUrl}
                placeholder="Eg: https://googleform.com"
                setState={(value) => handleStateChange('githubUrl', value)}
            />

            <CustomMenu
                title="Department"
                state={form.category}
                filters={departmentFilters}
                setState={(value) => handleStateChange('category', value)}
            />

            <div className="flexStart w-full">
                <Button
                    title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={submitting ? "" : "/plus.svg"}
                    submitting={submitting}
                />
            </div>
        </form>
    )
}

export default SurveyForm