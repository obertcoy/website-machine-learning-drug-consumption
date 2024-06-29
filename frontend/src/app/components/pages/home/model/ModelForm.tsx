'use client'

import { useState } from "react";
import ModelDemographicForm from "./ModelDemographicForm";
import { PredictDemographicDto, PredictDto, PredictPsychologicDto } from "@/dto/PredictDto";
import ModelPsychologicForm from "./ModelPsychologicForm";

export enum ModelFormEnum {
    DEMOGRAPHIC = 'DEMOGRAPHIC',
    PSYCHOLOGIC = 'PSYCHOLOGIC'
}

export default function ModelForm() {

    const [currentForm, setCurrentForm] = useState<ModelFormEnum>(ModelFormEnum.DEMOGRAPHIC)
    const [data, setData] = useState<Partial<PredictDto>>()

    const sendAPI = async (data: Partial<PredictDto>) => {
        const res = await fetch('http://127.0.0.1:8080/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Result: ", result);
    }

    const handleAddDemographicData = (demographicData: PredictDemographicDto) => {
        setData(prevData => ({
            ...prevData,
            ...demographicData
        }));
        setCurrentForm(ModelFormEnum.PSYCHOLOGIC)
    }

    const handleAddPsychologicData = async (psychologicData: PredictPsychologicDto) => {
        console.log("Testing")
        setData(prevData => ({
            ...prevData,
            ...psychologicData
        }));
        console.log("data:",data);       
        await sendAPI(data!); 
    }

    return (
        <div className="flex flex-col min-h-screen justify-center items-center w-full h-full relative py-32">

            <div className="flex flex-col justify-center items-center h-full gap-y-16 bg-light-background rounded-2xl 
            bg-opacity-20 p-16">

                <div className="flex flex-col justify-center items-center w-full h-full gap-y-2">

                    <h3 className="text-5xl font-medium text-light-accent">Try our model for free</h3>
                    <p className="text-xl text-dark-primary">start by inputting the demographic characteristic</p>

                </div>

                <ModelDemographicForm currentForm={currentForm} handleAddData={handleAddDemographicData} />
                <ModelPsychologicForm currentForm={currentForm} handleAddData={handleAddPsychologicData} />
            </div>
        </div>
    )
}