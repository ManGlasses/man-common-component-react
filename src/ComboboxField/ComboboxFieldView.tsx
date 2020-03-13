import React, { useRef } from 'react'
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import SearchIcon from '@material-ui/icons/Search'
import { UseComboboxReturnValue } from 'downshift'
import useResizeObserver from '../utils/useResizeObserver'
import usePrevious from '../utils/usePrevious'

export type ComboboxFieldViewProps = TextFieldProps & {
    inputItems: object[]
    scrollIndex: number
    combobox: UseComboboxReturnValue<object>
    onKeyDownInput: (event: KeyboardEvent) => void
    uniqueKey: string
    labelKey: string
    searchKeys?: string[]
    TextFieldSearchProps?: TextFieldProps
    renderTextItem?: (item: any, index: number) => React.ReactElement
    renderNoData?: (searchValue?: string) => React.ReactElement
}

const rowHeight = 48
const cache = new CellMeasurerCache({
    defaultHeight: rowHeight,
    fixedWidth: true,
})

const useStyles = makeStyles(theme => ({
    root: { width: '100%', height: '100%' },
    searchInput: { padding: theme.spacing(1) },
    hoverItem: { backgroundColor: theme.palette.action.hover },
    selectedItem: { backgroundColor: theme.palette.action.selected },
    selectedItemText: { fontWeight: 'bold' },
    otherMenu: { textAlign: 'center', padding: theme.spacing(1) },
}))

const ComboboxFieldView: React.FC<ComboboxFieldViewProps> = ({
    inputItems,

    scrollIndex,
    combobox,
    onKeyDownInput,

    uniqueKey,
    labelKey,
    searchKeys,

    placeholder,
    rowsMax = 10,

    TextFieldSearchProps,
    renderTextItem,
    renderNoData,

    ...others
}) => {
    cache.clearAll()

    const classes = useStyles()
    const anchorEl = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLDivElement | null>(null)
    const inputItemRef = useRef<HTMLDivElement | null>(null)

    const { width: anchorElWidth } = useResizeObserver(anchorEl)
    const widthOfMenu = Math.max(anchorElWidth || 0, 300)

    const previousIsOpen = usePrevious(combobox.isOpen)
    const previousScrollIndex = usePrevious(scrollIndex)

    const inputProps = combobox.getInputProps()
    delete inputProps.value

    return (
        <div {...combobox.getComboboxProps()} className={classes.root}>
            <TextField
                multiline
                ref={anchorEl}
                {...others}
                value={combobox.selectedItem?.[labelKey] || ''}
                InputLabelProps={{ ...others.InputLabelProps, ...combobox.getLabelProps() }}
                InputProps={{
                    ...others.InputProps,

                    readOnly: true,
                    endAdornment: (
                        <InputAdornment
                            position='end'
                            onClick={() => {
                                if (inputRef.current) {
                                    inputRef.current.focus()
                                }
                            }}
                        >
                            <ArrowDropDownIcon color='action' />
                        </InputAdornment>
                    ),
                }}
                {...{ inputRef, placeholder, rowsMax }}
                onClick={event => {
                    event.preventDefault()
                    combobox.setInputValue('')
                    combobox.openMenu()
                }}
            />

            <Popover
                open={combobox.isOpen}
                anchorEl={anchorEl.current}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                onClose={() => {
                    combobox.closeMenu()
                }}
            >
                <Paper square {...(combobox.isOpen ? { ...combobox.getMenuProps() } : {})}>
                    {searchKeys && searchKeys.length > 0 && (
                        <TextField
                            {...TextFieldSearchProps}
                            autoFocus
                            fullWidth
                            multiline
                            inputRef={inputItemRef}
                            placeholder={combobox.selectedItem?.[labelKey] || placeholder}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                ...TextFieldSearchProps?.InputProps,
                                ...inputProps,
                                onKeyDown: onKeyDownInput,
                            }}
                            className={classes.searchInput}
                            {...{ rowsMax }}
                        />
                    )}

                    <div
                        onMouseDown={event => {
                            event.preventDefault()
                        }}
                    >
                        <List
                            width={widthOfMenu}
                            height={300}
                            rowHeight={cache.rowHeight}
                            rowCount={inputItems.length}
                            noRowsRenderer={() => renderNoData?.(combobox?.inputValue) || <div></div>}
                            scrollToAlignment={
                                previousIsOpen !== combobox.isOpen && combobox.isOpen ? 'center' : 'auto'
                            }
                            scrollToIndex={
                                previousScrollIndex !== scrollIndex
                                    ? scrollIndex
                                    : previousIsOpen !== combobox.isOpen && combobox.isOpen
                                    ? scrollIndex
                                    : undefined
                            }
                            rowRenderer={({ key, index, parent, style }) => {
                                const item = inputItems[index]
                                const isHoverItem = combobox.highlightedIndex === index
                                const beSelectedItem = item[uniqueKey] === combobox.selectedItem?.[uniqueKey]
                                return (
                                    <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={index}>
                                        <ListItem
                                            key={`${item[uniqueKey]}${index}`}
                                            selected={isHoverItem}
                                            {...combobox.getItemProps({ item })}
                                            onClick={() => {
                                                setTimeout(() => {
                                                    combobox.selectItem(item)
                                                    combobox.closeMenu()
                                                }, 0)
                                            }}
                                            {...{ style }}
                                            ref={() => {}} //กัน error
                                        >
                                            <ListItemText
                                                primary={renderTextItem?.(item, index) || item?.[labelKey]}
                                                classes={{
                                                    primary: clsx({
                                                        [classes.selectedItemText]: beSelectedItem,
                                                    }),
                                                }}
                                            />
                                        </ListItem>
                                    </CellMeasurer>
                                )
                            }}
                        />
                    </div>
                </Paper>
            </Popover>
        </div>
    )
}

export default ComboboxFieldView
