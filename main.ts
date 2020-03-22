
namespace chirp {
    const I2C_DADDR = 0x20
    const REG_MOIST = 0x00
    const REG_NADDR = 0x01
    const REG_RADDR = 0x02
    const REG_PLGHT = 0x03
    const REG_LIGHT = 0x04

    function initialize() {
        // nothing to do
        // TODO: handle new address
    }

    initialize()

    function getRegister(register: number): number {
        let data = pins.createBuffer(1)
        data[0] = register
        pins.i2cWriteBuffer(I2C_DADDR, data)
        return pins.i2cReadNumber(I2C_DADDR, NumberFormat.Int8LE)
    }

    function setRegister(register: number, value: number) {
        let data = pins.createBuffer(2)
        data[0] = register
        data[1] = value
        pins.i2cWriteBuffer(I2C_DADDR, data)
    }

    export function getMoisture(): number {
        return getRegister(REG_MOIST)
    }

    export function setAddress(address: number) : boolean {
        setRegister(REG_NADDR, address)

        if (getAddress() == address)
            return true

        return false
    }

    export function getAddress(): number {
        return getRegister(REG_RADDR)
    }

    export function getLight(): number {
        setRegister(REG_PLGHT, 0)  // dummy value to trigger
        basic.pause(1500)
        return getRegister(REG_LIGHT)
    }
}