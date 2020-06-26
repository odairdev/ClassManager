module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getFullYear() - birth.getFullYear() //2020 - 1993 = 27
        const month = today.getMonth() - birth.getMonth() //06 - 08 = - 02
        const day = today.getDate() - birth.getDate() //14 - 27 = -13

        if (month <= 0 && day < 0) {
            return age = age - 1
        } else {
            return age
        }
    },

    graduation: function(value) {
        if (value == 'E.S') {
            return 'Ensino Superior Completo'
        } else if (value == 'E.M') {
            return 'Ensino Médio Completo'
        } else if (value == 'mestre') {
            return 'Mestrado'
        } else if (value == 'doutor') {
            return 'Doutorado'
        } else {
            return 'erro'
        }
    },

    date: function(timespan) {
        const data = new Date(timespan)

        const year = data.getUTCFullYear()
        const month = `0${data.getUTCMonth() + 1}`.slice(-2)
        const day = `0${data.getUTCDate()}`.slice(-2)

        return {
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    },

    grade: function(grade) {
        let correctValue = ''

        switch(grade) {
            case 'f6':
                correctValue = 'Ensino Fundamental 6° ano'
                break;
            case 'f7':
                correctValue = 'Ensino Fundamental 7° ano'
                break;
            case 'f8':
                correctValue = 'Ensino Fundamental 8° ano'
                break;
            case 'f9':
                correctValue = 'Ensino Fundamental 9° ano'
                break;
            case 'm1':
                correctValue = 'Ensino Médio 1° ano'
                break;
            case 'm2':
                correctValue = 'Ensino Médio 2° ano'
                break;
            case 'm3':
                correctValue = 'Ensino Médio 3° ano'
                break;
        }

        return correctValue;
    }
}