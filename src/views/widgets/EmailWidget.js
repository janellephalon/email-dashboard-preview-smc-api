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
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
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

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <div className="d-flex justify-content-between">
          <div className="title-style">Secure Message Preview</div>
          <CDropdown>
            <CDropdownToggle color="secondary widget-button">
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => handleViewChange('inbox')}>Inbox</CDropdownItem>
              <CDropdownItem onClick={() => handleViewChange('sent')}>Sent</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </CCardHeader>
      <CCardBody>
        <div className="email-table">
          <CTable align="middle" className="mb-4 border" hover responsive>
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
                    {' '}
                    Loading emails...{' '}
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
        </div>
      </CCardBody>
    </CCard>
  )
}

export default EmailTable
