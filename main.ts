//% block="Data Pages" color="#AA278D" 
namespace DataLoggerPages {
    const MAX_SECTION = Infinity
    const MAX_PAGE = Infinity
    const MAX_INDEX = Infinity

    let _eraseFlashOnSave = true
    let _useGroup = false
    let _UID = ""
    let _page = 0
    let _section = 0

    let _RAMData: number[][][] = []

    //% block="erase unsaved data"
    //% group="Data"
    function eraseRAM() {
        _RAMData = []
    }

    //% block="set data at index $index to $value"
    //% group="Data"
    export function setData(index: number = 0, value: number = 0) {
        index = Math.clamp(0, MAX_INDEX, index)
        if (_RAMData[_section] == undefined)
            _RAMData[_section] = []
        if (_RAMData[_section][_page] == undefined)
            _RAMData[_section][_page] = []

        _RAMData[_section][_page][index] = value
    }

    //% block="get data at index $index"
    //% group="Data"
    export function getData(index: number = 0): number {
        index = Math.clamp(0, MAX_INDEX, index)
        if (_RAMData[_section] == undefined)
            return 0
        if (_RAMData[_section][_page] == undefined)
            return 0
        return _RAMData[_section][_page][index] || 0
    }

    //% block="change data at index $index by $offset"
    //% group="Data"
    export function changeData(index: number = 0, offset: number = 1) {
        setData( index, getData(index) + offset )
    }

    //% block="save data to disk"
    //% group="Data"
    export function saveData() {
        if (_eraseFlashOnSave )
            datalogger.deleteLog( datalogger.DeleteType.Fast )
        
        let _saveGroup = Math.randomRange(0, 65535)

        // Build the column array
        let columns: string[] = []
        if (_UID.length > 0)
            columns.push( "board id" )
        if (_useGroup )
            columns.push( "group" )        
        columns.push("section")
        columns.push("page")
        columns.push("index")
        columns.push("value")
        datalogger.setColumns( columns )

        _RAMData.forEach((section, secIndex) => {
            if (!section)
                return
            
            section.forEach((page, pageIndex) => {
                if (!page)
                    return
                
                page.forEach((value, index) => {
                    if( !value )
                        return
                    
                    let record: datalogger.ColumnValue[] = []
                    if (_UID.length > 0)
                        record.push(datalogger.createCV("board id", _UID))
                    if (_useGroup)
                        record.push(datalogger.createCV("group", _saveGroup))
                    record.push(datalogger.createCV("section", secIndex))
                    record.push(datalogger.createCV("page", pageIndex))
                    record.push(datalogger.createCV("index", index))
                    record.push(datalogger.createCV("value", value))

                    datalogger.logData( record )
                })
            })
        })
    }

    //% block="set page to $page"
    //% group="Pages"
    export function setPage(page: number = 0) {
        _page = Math.clamp(0, MAX_PAGE, page)
    }

    //% block="change page by $offset"
    //% group="Pages"
    export function changePage(offset: number = 1) {
        setPage(_page + offset)
    }

    //% block="page"
    //% group="Pages"
    export function getPage(): number {
        return _page
    }

    //% block="set section to $section"
    //% group="Sections"
    export function setSection(section: number = 0) {
        _section = Math.clamp(0, MAX_SECTION, section)
    }

    //% block="change section by $offset"
    //% group="Sections"
    export function changeSection(offset: number = 1) {
        setSection(_section + offset)
    }

    //% block="section"
    //% group="Sections"
    export function getSection(): number {
        return _section
    }

    //% block="set board data identifier to $newUID"
    //% advanced="true"
    export function setLogWithUID(newUID: string) {
        _UID = newUID
    }

    //% block="save data with group IDs $useGroup"
    //% useGroup.shadow="toggleYesNo"
    //% advanced="true"
    export function setLogWithSaveGroup( useGroup: boolean = false ) {
        _useGroup = useGroup
    }

    //% block="erase flash when saving $erase"
    //% erase.shadow="toggleYesNo"
    //% advanced="true"
    export function eraseFlashOnSave( erase: boolean = true ) {
        _eraseFlashOnSave = erase
    }

}