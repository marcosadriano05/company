import { Employee } from '../entities'

export interface IncreaseSalary {
  increase: (employee: Employee) => Promise<Employee>
}
