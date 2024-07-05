import React, { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import * as icons from '@ant-design/icons'
import Icon from '@ant-design/icons'
import { Modal, Table, Button, message } from 'antd'
import EditModal from './EditModal'
import { menus } from './data'
import { PageTransition } from 'src/components/PageTransition'

interface DataType {
  label: string
  key: string
  icon?: string
}

const Menu: React.FC = () => {
  const [modal, contextHolderModal] = Modal.useModal()
  const [messageApi, contextHolderMessage] = message.useMessage()
  const [id, setId] = useState<string | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const columns: ColumnsType<DataType> = [
    {
      title: '菜单名称',
      dataIndex: 'label',
      render: (text, record) => (
        <>
          <span className="mr-2">
            {record.icon && (icons as any)[record.icon] && (
              <Icon component={(icons as any)[record.icon]} />
            )}
          </span>
          {text}
        </>
      )
    },
    {
      title: '路径',
      dataIndex: 'key'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" size="small" onClick={() => handleEdit(record.key)}>
            编辑
          </Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.key)}>
            删除
          </Button>
        </>
      )
    }
  ]

  const handleEdit = (id?: string) => {
    setIsModalOpen(true)
    setId(id)
  }

  const handleDelete = (id: string) => {
    modal.confirm({
      title: '您确定要删除吗?',
      onOk() {
        console.log(id, 'OK')
        messageApi.open({
          type: 'success',
          content: '删除成功'
        })
      }
    })
  }

  return (
    <PageTransition>
      <Table columns={columns} dataSource={menus} pagination={false} />
      <EditModal isModalOpen={isModalOpen} id={id} onCancel={() => setIsModalOpen(false)} />
      {contextHolderModal}
      {contextHolderMessage}
    </PageTransition>
  )
}

export default Menu
