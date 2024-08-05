import { FC } from "react"

const EmptyState: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">Hey Welcome here</h3>
        <p className="text-xl mt-5 text-muted-foreground">Create new workspace or team to get started.</p>
      </div>
    </div>
  )
}

export default EmptyState