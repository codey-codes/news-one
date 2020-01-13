const formatter = {
    getMonthName: month => {
        switch (month) {
            case 0:
                month = 'Jan';
                break;
            case 1:
                month = 'Feb';
                break;
            case 2:
                month = 'Mar';
                break;
            case 3:
                month = 'Apr';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'Jun';
                break;
            case 6:
                month = 'Jul';
                break;
            case 7:
                month = 'Aug';
                break;
            case 8:
                month = 'Sep';
                break;
            case 9:
                month = 'Oct';
                break;
            case 10:
                month = 'Nov';
                break;
            case 11:
                month = 'Dec';
                break;
            default:
                break;
        }
        return month;
    },
    addZero: value => {
        if (value < 10) return '0' + value;
        else return value;
    },
    countryCodeFormatter: cc => {
        if (cc === 'ae' || cc === 'ar' || cc === 'at' || cc === 'au' || cc === 'be' || cc === 'bg' || cc === 'br' || cc === 'ch' || cc === 'cn' || cc === 'co' || cc === 'cu' || cc === 'cz' || cc === 'de' || cc === 'eg' || cc === 'fr' || cc === 'gb' || cc === 'gr' || cc === 'hk' || cc === 'hu' || cc === 'id' || cc === 'ie' || cc === 'il' || cc === 'in' || cc === 'it' || cc === 'jp' || cc === 'kr' || cc === 'lt' || cc === 'lv' || cc === 'ma' || cc === 'mx' || cc === 'my' || cc === 'ng' || cc === 'nl' || cc === 'no' || cc === 'nz' || cc === 'ph' || cc === 'pl' || cc === 'pt' || cc === 'ro' || cc === 'rs' || cc === 'ru' || cc === 'sa' || cc === 'se' || cc === 'sg' || cc === 'si' || cc === 'sk' || cc === 'th' || cc === 'tr' || cc === 'tw' || cc === 'ua' || cc === 'us' || cc === 've' || cc === 'za') {
            return [cc, false];
        } else return ['ca', true]
    }
}

export default formatter;