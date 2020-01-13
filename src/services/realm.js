import Realm from 'realm'

import SoilSchema from '../schemas/SoilSchema'

export default function getRealm() {
    return Realm.open({
        schema: [SoilSchema]
    })
}