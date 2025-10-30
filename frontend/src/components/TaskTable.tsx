import React from 'react';
import {
  useMaterialReactTable,
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Task } from '../types';
import { PencilIcon, TrashIcon, UserIcon } from 'lucide-react';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return { bg: '#f5f5f5', text: '#757575' }; // Pending
      case 'in-progress':
        return { bg: '#e3f2fd', text: '#1976d2' }; // In Progress
      case 'completed':
        return { bg: '#e8f5e9', text: '#2e7d32' }; // Done
      default:
        return { bg: '#f5f5f5', text: '#757575' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Done';
      default:
        return status;
    }
  };

  const columns: MRT_ColumnDef<Task>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      size: 200,
      Cell: ({ cell }) => (
        <div style={{ fontWeight: 500 }}>{cell.getValue<string>()}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      size: 300,
      Cell: ({ cell }) => (
        <div
          className="table-description"
          style={{
            maxWidth: 300,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#666',
          }}
        >
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 120,
      muiTableHeadCellProps: {
        align: 'center' as const, // centers header text
      },
      Cell: ({ cell }) => {
        const status = cell.getValue<string>();
        const statusColor = getStatusColor(status);
        return (
          <div className="flex items-center justify-center">
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500,
                backgroundColor: statusColor.bg,
                color: statusColor.text,
                textAlign: 'center'
              }}
            >
              {getStatusLabel(status)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'assignedTo',
      header: 'Assigned To',
      muiTableHeadCellProps: {
        align: 'center' as const, // centers header text
      },
      size: 150,
      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-lg"><UserIcon size={20} /></span>
          <span>{row.original.assignedTo?.name || 'Unassigned'}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 150,
      enableSorting: false,
      muiTableHeadCellProps: {
        align: 'center' as const,
      },
      Cell: ({ row }: { row: any }) => (
        <div className="flex gap-3 flex-row md:gap-1.5">
          <button
            onClick={() => onEdit(row.original)}
            className="flex flex-row items-center md:px-0 px-3 justify-center py-1.5 border border-[#e0e0e0] rounded-md text-[13px] font-medium cursor-pointer bg-[#f5f5f5] text-[#333] transition-all hover:bg-[#e8e8e8] hover:border-[#d0d0d0] md:w-full md:py-2 md:text-xs"
          >
            <PencilIcon size={15} className="mr-1"/>
            Edit
          </button >
          <button
            onClick={() => onDelete(row.original._id)}
            className="flex flex-row items-center md:px-0 px-3 justify-center py-1.5 border border-[#dc3545] rounded-md text-[13px] font-medium cursor-pointer bg-[#dc3545] text-white transition-all hover:bg-[#c82333] hover:border-[#bd2130] md:w-full md:py-2 md:text-xs"
          >
            <TrashIcon size={15} className="mr-1" />
            Delete
          </button>
        </div >
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: tasks,
    enableColumnResizing: false,
    enableColumnFilterModes: false,
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableGrouping: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableBottomToolbar: true,
    enableDensityToggle: false,
    enableFilters: false,
    enableSorting: true,
    enableSortingRemoval: true,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    initialState: {
      showGlobalFilter: false,
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: false,
      density: 'compact',
    },
    paginationDisplayMode: 'pages',
    muiTableContainerProps: {
      sx: {
        maxHeight: '600px',
        '@media (max-width: 768px)': {
          maxHeight: 'none',
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderRight: '1px solid rgba(224, 224, 224, 0.5)',
        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
        '@media (max-width: 768px)': {
          borderRight: 'none',
          padding: '8px 4px',
          fontSize: '13px',
          '&:first-of-type': {
            fontWeight: 600,
          },
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        borderRight: '1px solid rgba(224, 224, 224, 0.5)',
        backgroundColor: '#fafafa',
        '@media (max-width: 768px)': {
          borderRight: 'none',
          padding: '8px 4px',
          fontSize: '11px',
          fontWeight: 600,
        },
      },
    },
    muiTablePaperProps: {
      sx: {
        '@media (max-width: 768px)': {
          boxShadow: 'none',
        },
      },
    },
    muiPaginationProps: {
      sx: {
        '@media (max-width: 768px)': {
          '& .MuiToolbar-root': {
            flexWrap: 'wrap',
            gap: '8px',
          },
        },
      },
    },
  });

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm w-full overflow-x-auto">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default TaskTable;
