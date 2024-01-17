import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

const EmailTable = () => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const tokenResponse = await axios.get('http://localhost:5000/token');
        const messagesResponse = await axios.get('http://localhost:5000/messages', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        });
        const sortedEmails = messagesResponse.data.items.sort(
          (a, b) => new Date(b.createTime) - new Date(a.createTime),
        );
        setEmails(sortedEmails);
      } catch (error) {
        console.error('Error fetching emails:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString();
    } else {
      return date.toLocaleDateString();
    }
  };

  if (isLoading) {
    return <div>Loading emails...</div>;
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>Secure Inbox Preview</CCardHeader>
      <CCardBody>
        <div className="email-table">
          <CTable align="middle" className="mb-4 border" hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" className="">
                  Sender
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="">
                  Subject
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="">
                  Date
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="table-body">
              {emails.length > 0 ? (
                emails.map((email, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{email.senderAddress}</CTableDataCell>
                    <CTableDataCell>{email.subject}</CTableDataCell>
                    <CTableDataCell>{formatDate(email.createTime)}</CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={3}>No emails found</CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default EmailTable;
