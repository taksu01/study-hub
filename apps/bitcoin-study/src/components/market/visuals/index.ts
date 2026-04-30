import MoneyPropertiesTable from './MoneyPropertiesTable'
import SupplySchedule from './SupplySchedule'
import InflationVisualizer from './InflationVisualizer'
import AssetComparison from './AssetComparison'

export const marketVisualRegistry: Record<string, React.ComponentType> = {
  MoneyPropertiesTable,
  SupplySchedule,
  InflationVisualizer,
  AssetComparison,
}
