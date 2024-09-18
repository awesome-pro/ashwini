"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function QueuePage() {
  const router = useRouter();

  const queueData = [
    {
      patientId: 'P001',
      patientName: 'John Doe',
      roomNo: 101,
      doctorId: 'D001',
      doctorName: 'Dr. Alice Johnson',
      status: 'In Progress',
    },
    {
      patientId: 'P002',
      patientName: 'Jane Smith',
      roomNo: 102,
      doctorId: 'D002',
      doctorName: 'Dr. Bob Williams',
      status: 'Completed',
    },
    {
      patientId: 'P003',
      patientName: 'Michael Brown',
      roomNo: 103,
      doctorId: 'D003',
      doctorName: 'Dr. Charlie Davis',
      status: 'Pending',
    },
    {
      patientId: 'P004',
      patientName: 'Emily White',
      roomNo: 104,
      doctorId: 'D004',
      doctorName: 'Dr. Susan Miller',
      status: 'In Progress',
    },
    {
      patientId: 'P005',
      patientName: 'Daniel Lee',
      roomNo: 105,
      doctorId: 'D005',
      doctorName: 'Dr. James Smith',
      status: 'Completed',
    },
    {
      patientId: 'P006',
      patientName: 'Sophia Martinez',
      roomNo: 106,
      doctorId: 'D006',
      doctorName: 'Dr. Linda Green',
      status: 'Pending',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-green-500" />;
      case 'In Progress':
        return <FontAwesomeIcon icon={faClock} className="h-6 w-6 text-blue-500" />;
      case 'Pending':
        return <FontAwesomeIcon icon={faTimesCircle} className="h-6 w-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 via-blue-50 to-purple-100 p-8">
      <Card className="shadow-lg rounded-xl overflow-hidden w-full max-w-6xl bg-white border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <CardTitle className="text-3xl font-extrabold text-center">Doctor & Patient Queue</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Table className="w-full">
            <TableHeader className="bg-gray-50 border-b border-gray-200">
              <TableRow>
                <TableHead className="py-3 px-4 text-gray-600">Patient ID</TableHead>
                <TableHead className="py-3 px-4 text-gray-600">Patient Name</TableHead>
                <TableHead className="py-3 px-4 text-gray-600">Room No.</TableHead>
                <TableHead className="py-3 px-4 text-gray-600">Doctor ID</TableHead>
                <TableHead className="py-3 px-4 text-gray-600">Doctor Name</TableHead>
                <TableHead className="py-3 px-4 text-gray-600">Status</TableHead>
                <TableHead className="py-3 px-4 text-gray-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queueData.map((item, index) => (
                <TableRow
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300`}
                >
                  <TableCell className="py-3 px-4 text-gray-700 font-medium">{item.patientId}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 font-medium">{item.patientName}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 font-medium">{item.roomNo}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 font-medium">{item.doctorId}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 font-medium">{item.doctorName}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 flex items-center gap-2 font-medium">
                    {getStatusIcon(item.status)}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === 'Completed'
                          ? 'bg-green-100 text-green-600'
                          : item.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center">
                    <Link href={`/queue/${item.patientId}`}>
                      <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
                        Check Status
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

export default QueuePage;
