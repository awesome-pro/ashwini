"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { appointmentSchemaNew, appointmentSchemaRegistered } from "../../schema/apointmentSchema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import axios from "axios";
import Image from "next/image"; // For adding an image component

function AppointmentForm() {
  const [response, setResponse] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const formNew = useForm<z.infer<typeof appointmentSchemaNew>>({
    resolver: zodResolver(appointmentSchemaNew),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "M",
      age: 0,
    },
  });

  const formRegistered = useForm<z.infer<typeof appointmentSchemaRegistered>>({
    resolver: zodResolver(appointmentSchemaRegistered),
    defaultValues: {
      patientId: "cm11mxqsb000b4nipvmbu70c8",
    },
  });

  async function onSubmitNew(data: z.infer<typeof appointmentSchemaNew>) {
    setLoading(true);
    try {
      const responseData = await axios.post("/api/appointments", data);
      setResponse(responseData.data.jobId as string);
      toast({
        title: `Patient created successfully!`,
        description: `Patient ID: ${responseData.data.jobId}`,
        icon: <AiOutlineCheckCircle className="text-green-500" />,
      });
    } catch (error) {
      toast({
        title: `Error creating patient`,
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmitRegistered(data: z.infer<typeof appointmentSchemaRegistered>) {
    setLoading(true);
    try {
      const responseData = await axios.post("/api/appointments", data);
      setResponse(responseData.data.jobId as string);
      toast({
        title: `Appointment requested successfully!`,
        description: `Request ID: ${responseData.data.jobId}`,
        icon: <AiOutlineCheckCircle className="text-green-500" />,
      });
    } catch (error) {
      toast({
        title: `Error requesting appointment`,
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-lg overflow-hidden max-w-4xl w-full mx-auto">
      {/* Left Side Image */}
      <div className="relative h-full">
        <img
          src="https://images.unsplash.com/photo-1584467735867-4297ae2ebcee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwb2ludG1lbnQlMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D" // Replace with your image path
          alt="Appointment Image"
          className="object-cover"
        />
      </div>

      {/* Right Side Form */}
      <div className="p-6">
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid grid-cols-2 gap-4 mb-6">
            <TabsTrigger value="registered" className="flex items-center justify-center gap-2 text-lg font-semibold text-primary">
              <FaUserCheck /> Registered
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center justify-center gap-2 text-lg font-semibold text-primary">
              <FaUserPlus /> New
            </TabsTrigger>
          </TabsList>

          {/* Registered Patient Form */}
          <TabsContent value="registered">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-sky-600">Registered Patient</CardTitle>
                <CardDescription className="text-gray-500">
                  Enter your patient ID to request an appointment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...formRegistered}>
                  <form onSubmit={formRegistered.handleSubmit(onSubmitRegistered)} className="space-y-6">
                    <FormField
                      control={formRegistered.control}
                      name="patientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your patient ID" {...field} disabled={loading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              {response && (
                <CardFooter className="flex flex-col items-center">
                  <p className="text-lg">Your Request ID: <strong>{response}</strong></p>
                  <Button
                    className="mt-2"
                    onClick={() => router.push(`/queue/${response}`)}
                  >
                    Check Status
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          {/* New Patient Form */}
          <TabsContent value="new">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-sky-600">New Patient</CardTitle>
                <CardDescription className="text-gray-700">
                  Fill in the details to create a new appointment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...formNew}>
                  <form onSubmit={formNew.handleSubmit(onSubmitNew)} className="space-y-6">
                    <FormField
                      control={formNew.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter patient name" {...field} disabled={loading} />
                          </FormControl>
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
                            <Input placeholder="Enter patient email" {...field} disabled={loading} />
                          </FormControl>
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
                            <Input placeholder="Enter patient phone number" {...field} disabled={loading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formNew.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter patient gender" {...field} disabled={loading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              {response && (
                <CardFooter className="flex flex-col items-center">
                  <p className="text-lg">Your Request ID: <strong>{response}</strong></p>
                  <Button
                    className="mt-2"
                    onClick={() => router.push(`/queue/${response}`)}
                  >
                    Check Status
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AppointmentForm;
