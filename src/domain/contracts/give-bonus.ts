import { Employee } from '../entities'

export interface GiveBonus {
  give: (employee: Employee) => Promise<number>
}
