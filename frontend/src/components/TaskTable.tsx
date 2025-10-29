import React from 'react';
import {
  useMaterialReactTable,
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Task } from '../types';
import './TaskTable.css';

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
      Cell: ({ cell }) => {
        const status = cell.getValue<string>();
        const statusColor = getStatusColor(status);
        return (
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: statusColor.bg,
              color: statusColor.text,
            }}
          >
            {getStatusLabel(status)}
          </span>
        );
      },
    },
    {
      accessorKey: 'assignedTo',
      header: 'Assigned To',
      size: 150,
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>👤</span>
          <span>{row.original.assignedTo?.name || 'Unassigned'}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 150,
      Cell: ({ row }) => (
        <div className="table-actions">
          <button
            onClick={() => onEdit(row.original)}
            style={{
              padding: '6px 16px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              backgroundColor: '#f5f5f5',
              color: '#333',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e8e8e8';
              e.currentTarget.style.borderColor = '#d0d0d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(row.original._id)}
            style={{
              padding: '6px 16px',
              border: '1px solid #dc3545',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              backgroundColor: '#dc3545',
              color: 'white',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c82333';
              e.currentTarget.style.borderColor = '#bd2130';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#dc3545';
              e.currentTarget.style.borderColor = '#dc3545';
            }}
          >
            Delete
          </button>
        </div>
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
    <div style={{ 
      background: 'white', 
      borderRadius: '8px', 
      overflow: 'hidden', 
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      width: '100%',
      overflowX: 'auto',
    }}>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default TaskTable;
