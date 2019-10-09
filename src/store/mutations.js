import { 
  MANAGERS,
  DEPARTMENTS
} from './mutation-type'

export default {
  [MANAGERS] (state, managers) {
    state.managers = managers
  },
  
  [DEPARTMENTS] (state, departments) {
    state.departments = departments
  }
}
