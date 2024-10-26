"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "./LoadingSpinner";

const TeacherForm = dynamic(()=> import('./forms/TeacherForm'), {
  loading: ()=><LoadingSpinner />
})
const StudentForm = dynamic(()=> import('./forms/StudentForm'), {
  loading: ()=><LoadingSpinner />
})

const formsObject: {
  [key: string]: (type:'update' | 'create', data?: any)=>JSX.Element;
} = {
  teacher: (type, data)=> <TeacherForm type={type} data={data} />,
  student: (type, data)=> <StudentForm type={type} data={data} />
}

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
}) => {
  const [open, setOpen] = useState(false);

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-Yellow"
      : type === "update"
      ? "bg-Sky"
      : "bg-Purple";

  const Form = ()=>{
    return type === 'delete' && id? 
    <div className="flex flex-col gap-4 items-center">
      <h2>Are You Suru You Want To Delete This Item?</h2>
      <button className="py-3 px-5 bg-red-800 rounded-md text-white">Delete</button>
    </div> : 
    formsObject[table](type, data);
  }
 
  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;