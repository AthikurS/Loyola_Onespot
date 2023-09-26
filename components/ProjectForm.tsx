"use client"

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

import FormField from './FormField';
import Button from './Button';
import CustomMenu from './CustomMenu';
import { departmentFilters } from '@/constant';
import { updateProject, createNewProject, fetchToken } from '@/lib/actions';
import { FormState, ProjectInterface, SessionInterface } from '@/common.types';

type Props = {
    type: string,
    session: SessionInterface,
    project?: ProjectInterface
}

const ProjectForm = ({ type, session, project }: Props) => {
    const router = useRouter()

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm] = useState<FormState>({
        title: project?.title || "",
        description: project?.description || "",
        image: project?.image || "",
        liveSiteUrl: project?.liveSiteUrl || "",
        githubUrl: project?.githubUrl || "",
        category: project?.category || "",
        futureEnhancement: project?.futureEnhancement || "",
    })

    const handleStateChange = (fieldName: keyof FormState, value: string) => {
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
                await createNewProject(form, session?.user?.id, token)

                router.push("/initialprojectload")
            }

            if (type === "edit") {
                await updateProject(form, project?.id as string, token)

                router.push("/initialprojectload")
            }

        } catch (error) {
            alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
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
                title="Title"
                state={form.title}
                placeholder="Enter your Title"
                setState={(value) => handleStateChange('title', value)}
                isRequired={true}
            />

            <FormField
                title='Description'
                state={form.description}
                placeholder="Enter project description."
                isTextArea
                setState={(value) => handleStateChange('description', value)}
                isRequired={true}
            />

            <FormField
                isTextArea
                title="Website URL (or) type null"
                state={form.liveSiteUrl}
                placeholder="https://loyola-onespot.vercel.app"
                setState={(value) => handleStateChange('liveSiteUrl', value)}

            />

            <FormField
                isTextArea
                title="Github URL (or) type null"
                state={form.githubUrl}
                placeholder="Eg: https://github.com"
                setState={(value) => handleStateChange('githubUrl', value)}
            />
            <FormField
                title='Future Enhancement'
                state={form.futureEnhancement}
                placeholder="Enter this project's Future Enhancement."
                isTextArea
                setState={(value) => handleStateChange('futureEnhancement', value)}
                isRequired={true}
            />

            <CustomMenu
                title="Department"
                state={form.category}
                filters={departmentFilters}
                setState={(value) => handleStateChange('category', value)}
            />


            <div className="flexStart w-full">
                <Button
                    title={submitting ? `${type === "create" ? "Creating" : "Updating"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={submitting ? "" : "/plus.svg"}
                    submitting={submitting}
                />
            </div>
        </form>
    )
}

export default ProjectForm