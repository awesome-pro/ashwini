"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { appointmentSchemaNew, appointmentSchemaRegistered } from '../../schema/apointmentSchema';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useToast } from '@/hooks/use-toast';
import { title } from 'process';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function AppointmentForm() {
    const [registered, setRegistered] = React.useState<boolean>(false);
    const [response, setResponse] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const {toast} = useToast();
    const schema = registered ? appointmentSchemaRegistered : appointmentSchemaNew

    const router = useRouter();

    const formNew = useForm<z.infer<typeof appointmentSchemaNew>>({
        resolver: zodResolver(appointmentSchemaNew),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            gender: "M",
            age: 0
        }
    });

    const formRegistered = useForm<z.infer<typeof appointmentSchemaRegistered>>({
        resolver: zodResolver(appointmentSchemaRegistered),
        defaultValues: {
            patientId: 'cm11mxqsb000b4nipvmbu70c8'
        }
    });

    async function onSubmitNew(data: z.infer<typeof appointmentSchemaNew>) {
        console.log(data);
        setLoading(true);

        try {
            const responseData = await axios.post('/api/appointments', data);
            console.log(responseData);

            if(responseData.status === 201 || responseData.status === 200){
                setResponse(responseData.data.jobId as string);
                toast({
                    title: `Patient created successfully with ID: ${responseData.data.jobId}`,
                    description: "Patient created successfully",
                })
            }else{
                toast({
                    title: `Failed to create patient`,
                    description: "Failed to create patient",
                })
            }
        }catch(error){
            console.log(error);
            toast({
                title: `Failed to create patient: ${error}`,
                description: "Failed to create patient",
                variant: "destructive"
            })
        }finally{
            setLoading(false);
        }
    }

    async function onSubmitRegistered(data: z.infer<typeof appointmentSchemaRegistered>) {
        console.log(data);
        setLoading(true);
        try {
            const responseData = await axios.post('/api/appointments', data);
            console.log(responseData);

            if(responseData.status === 201 || responseData.status === 200){
                setResponse(responseData.data.jobId as string);
                toast({
                    title: `Appointment requested  successfully with ID: ${responseData.data.jobId}`,
                    description: "Patient created successfully",
                })
            }else{
                toast({
                    title: `Failed to create patient`,
                    description: "Failed to create patient",
                })
            }
        } catch (error) {
            console.log(error);
            toast({
                title: `Failed to create patient: ${error}`,
                description: "Failed to create patient",
                variant: "destructive"
            })
        }finally{
            setLoading(false);
        }
    }

  return (
    <Tabs defaultValue="new" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="registered" className='text-primary text-2xl font-semibold'>Registered</TabsTrigger>
        <TabsTrigger value="new" className='text-primary text-2xl font-semibold'>New</TabsTrigger>
      </TabsList>
      <TabsContent value="registered">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when youre done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Form {...formRegistered}>
            <form onSubmit={formRegistered.handleSubmit(onSubmitRegistered)} className="space-y-8">
                <FormField
                control={formRegistered.control}
                name="patientId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Patient ID</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} disabled={loading}/>
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={loading}>Submit</Button>
            </form>
        </Form>
          </CardContent>
          <CardFooter>

            {response && (
                <div>
                    <p>Your Request ID is : {response}</p>
                    <Button
                     onClick={() => {
                        router.push(`/queue/${response}`);
                     }}
                    >
                        Check Status
                    </Button>
                </div>
            )}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="new">
        <Card>
          <CardHeader>
            <CardTitle>New</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...formNew}>
                <form onSubmit={formNew.handleSubmit(onSubmitNew)} className="space-y-8">
                    <FormField
                    control={formNew.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} disabled={loading}/>
                        </FormControl>
                        <FormDescription>
                            This is the name of the patient.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={formNew.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} disabled={loading}/>
                        </FormControl>
                        <FormDescription>
                            This is the email of the patient.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={formNew.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} disabled={loading} />
                        </FormControl>
                        <FormDescription>
                            This is the phone of the patient.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={formNew.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Gender
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} disabled={loading}/>
                            </FormControl>
                            <FormDescription>
                                Gender of the patient.
                            </FormDescription>
                        </FormItem>
                    )}
                    />

                    <Button type="submit" disabled={loading}>Submit</Button>
                </form>
            </Form>
          </CardContent>

          <CardFooter>

            {response && (
                <div>
                    <p>Your Request ID is : {response}</p>
                    <Button
                     onClick={() => {
                        router.push(`/queue/${response}`);
                     }}
                    >
                        Check Status
                    </Button>
                </div>
            )}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AppointmentForm