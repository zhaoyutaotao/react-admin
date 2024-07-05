import { useState } from 'react'
import { useRequest } from 'ahooks'
import { TreeSelect, Form, Input, message, Modal, Radio, InputNumber } from 'antd'
import { IconSelect } from 'src/components/IconSelect'
// import {
//   addMenu,
//   getMenuDetail,
//   updateMenu
// } from 'src/services/menu'
import { menus } from './data'

interface Props {
  id?: string
  isModalOpen: boolean
  onOk?: () => void
  onCancel?: () => void
}

const EditModal: React.FC<Props> = ({ id, isModalOpen, onOk, onCancel }) => {
  const isEdit = !!id
  const title = isEdit ? '编辑' : '新增'
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  // useRequest(getMenuDetail, {
  //   ready: isModalOpen && isEdit,
  //   defaultParams: [{ pid: id }],
  //   onSuccess: ({ data }) => {
  //     form.setFieldsValue({
  //       taskId: data.taskId,
  //       title: data.title,
  //       eventTitle: data.eventTitle,
  //       taskContent: data.taskContent
  //     })
  //   }
  // })
  // const { run: addRun } = useRequest(addTask, {
  //   manual: true,
  //   onSuccess: () => {
  //     message.success('新增成功!')
  //     onOk?.()
  //   },
  //   onFinally: () => {
  //     setLoading(false)
  //   }
  // })
  // const { run: updateRun } = useRequest(updateTask, {
  //   manual: true,
  //   onSuccess: () => {
  //     message.success('转办成功!')
  //     onOk?.()
  //   },
  //   onFinally: () => {
  //     setLoading(false)
  //   }
  // })
  // 保存
  const handleOk = async (): Promise<void> => {
    // const values = await form.validateFields()
    // if (values.sendTime) values.sendTime = values.sendTime.format('YYYY-MM-DD HH:mm:ss')
    // if (isEdit) {
    //   updateRun(values)
    // } else {
    //   addRun(values)
    // }
  }

  return (
    <Modal
      title={title}
      open={isModalOpen}
      maskClosable={false}
      destroyOnClose
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      width={600}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
        preserve={false}
      >
        {isEdit ? <Form.Item hidden name="id" /> : null}
        <Form.Item
          name="parentId"
          label="上级菜单"
          rules={[
            {
              required: true,
              message: '请选择上级菜单'
            }
          ]}
        >
          <TreeSelect
            allowClear
            showSearch
            placeholder="请选择上级菜单"
            fieldNames={{ label: 'name', value: 'id' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={menus}
            treeNodeFilterProp="name"
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="权限类型"
          rules={[
            {
              required: true,
              message: '请选择权限类型'
            }
          ]}
        >
          <Radio.Group>
            <Radio value="1">子系统</Radio>
            <Radio value="2">菜单</Radio>
            <Radio value="3">功能操作</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="name"
          label="菜单（权限）名称"
          rules={[
            {
              required: true,
              message: '请输入菜单（权限）名称'
            }
          ]}
        >
          <Input placeholder="请输入菜单（权限）名称" />
        </Form.Item>
        <Form.Item name="path" label="路径">
          <Input placeholder="请输入路径" />
        </Form.Item>
        <Form.Item name="code" label="权限标识">
          <Input placeholder="请输入权限标识" />
        </Form.Item>
        <Form.Item
          name="sort"
          label="排序"
          rules={[{ required: true, type: 'number', min: 0, message: '请输入排序序号' }]}
        >
          <InputNumber placeholder="请输入排序序号" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="munuIconUrl" label="菜单图标">
          <IconSelect />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default EditModal
