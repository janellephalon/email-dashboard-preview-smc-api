import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
} from '@coreui/react'

const EmailTable = () => {
  const [emails, setEmails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState('inbox')

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true)
      const endpoint = currentView === 'inbox' ? '/messages' : '/sent-messages'
      try {
        const tokenResponse = await axios.get('http://localhost:5000/token')
        const messagesResponse = await axios.get(`http://localhost:5000${endpoint}`, {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        })
        const sortedEmails = messagesResponse.data.items.sort(
          (a, b) => new Date(b.createTime) - new Date(a.createTime),
        )
        setEmails(sortedEmails)
      } catch (error) {
        console.error(`Error fetching ${currentView} emails:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmails()
  }, [currentView])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    return date.toDateString() === today.toDateString()
      ? date.toLocaleTimeString()
      : date.toLocaleDateString()
  }

  return (
    <CCard className="mb-4 email-table">
      <CCardHeader>Secure Inbox Preview</CCardHeader>
      <div className="d-flex">
        <div className="email-sidebar">
          <ul>
            <li
              className={currentView === 'inbox' ? 'active' : ''}
              onClick={() => setCurrentView('inbox')}
            >
              Inbox
            </li>
            <li
              className={currentView === 'sent' ? 'active' : ''}
              onClick={() => setCurrentView('sent')}
            >
              Sent
            </li>
            {/* Add more folders if needed */}
          </ul>
        </div>
        <CCardBody>
          <CTable align="left" className="mb-4 border" hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Sender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="table-body">
              {isLoading ? (
                <CTableRow>
                  <CTableDataCell colSpan={3} className="">
                    <div className="placeholder"></div>
                  </CTableDataCell>
                </CTableRow>
              ) : emails.length > 0 ? (
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
        </CCardBody>
      </div>
    </CCard>
  )
}

export default EmailTable
