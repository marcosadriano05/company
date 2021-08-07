import { Employee } from '../entities'

export interface IncreaseSalary {
  increase: () => Promise<Employee>
}
