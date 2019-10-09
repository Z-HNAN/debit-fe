
export default {
  /* managers相关 */
  getPublicManagers: (state) => () => {
    return state.managers.map(man => { 
      return {id: man.id, name: man.name, phone: man.phone}
    })
  },
  getFullManagers: (state) => () => {
    return state.managers
  },
  
  /* departments相关 */
  getPublicDepartments: (state) => () => {
    return state.departments.map(dept => { 
      return {id: dept.id, name: dept.name}
    })
  },
  getFullDepartments: (state) => () => {
    return state.departments
  },
  
  /* department 和 managers depart在前 */
  getDepartmentsAndManagers: (state) => () => {
    let ret = []
    state.departments.forEach(dept => {
      state.managers.forEach(man => {
        if (dept.managerId === man.id) {
          ret.push({
            id: dept.id,
            name: dept.name,
            parentDepart: dept.parentDepart,
            manager: {
              name: man.name,
              address: man.address
            }
          })
        }
      })
    })
    return ret
  }
  
}
