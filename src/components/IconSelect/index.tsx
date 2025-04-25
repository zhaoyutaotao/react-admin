import * as icons from '@ant-design/icons'
import Icon from '@ant-design/icons'
import type { SelectProps } from 'antd'
import { Select } from 'antd'
import classNames from 'classnames'
import styles from './index.module.scss'

function isIconName(key: any): key is keyof typeof icons {
  return typeof icons[key as keyof typeof icons] === 'object' && key !== 'default'
}

/**
 * Icon选择
 */
export const IconSelect: React.FC<SelectProps> = (props) => {
  const { onChange } = props
  // 里面有一些是方法,要筛选一遍,否则页面会报错
  const iconList = Object.keys(icons).filter(isIconName)

  const handleClick = (key: string | null) => {
    onChange?.(key, { label: null })
  }

  return (
    <div className={styles.select_wrap}>
      {props.value && (
        <Icon
          className={styles.icon}
          component={icons[props.value as keyof typeof icons] as any}
          style={{ fontSize: 16 }}
        />
      )}
      <Select
        value={props.value}
        allowClear
        onClear={() => handleClick(null)}
        listHeight={400}
        placeholder="请选择图标"
        style={{ width: '100%' }}
        dropdownRender={() => (
          <div className={styles.select_list}>
            {iconList.map((key) => (
              <div
                className={classNames(styles.select_list_item, {
                  ['ant-select-item-option-selected']: key === props.value
                })}
                key={key}
                onClick={() => handleClick(key)}
              >
                <Icon
                  component={icons[key as keyof typeof icons] as any}
                  style={{ fontSize: 16 }}
                />
              </div>
            ))}
          </div>
        )}
      />
    </div>
  )
}
