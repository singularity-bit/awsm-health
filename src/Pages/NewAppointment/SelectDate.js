import * as React from 'react';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    DateNavigator,
    TodayButton,
    Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import {UserContext} from '../../UserContext'
const currentDate = Date.now();

export default function SelectDate(props) {
    const {chosenDate,idSpecialist}=props

    const [data, setData] = React.useState([]);
    const [newData,setNewData]=React.useState([])
    const [editingOptions, setEditingOptions] = React.useState({
        allowAdding: true,
        allowDeleting: false,
        allowUpdating: false,
        allowDragging: false,
        allowResizing: false,
    });
    const [addedAppointment, setAddedAppointment] = React.useState({});
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);

    const {allowAdding, allowDeleting, allowUpdating} = editingOptions;

  React.useEffect(()=>{
    //shows only active app
    idSpecialist && axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-medic-appoinments',({
        params:{
            id:idSpecialist
        }
    })).then(res=> {
        console.log("id",idSpecialist)
        setData(res.data)});
        
},[])

    React.useEffect(()=>{
        chosenDate(newData);
    },[newData])

    const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
        if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
        setNewData([...newData,{ ...added }])
        }
        if (changed) {
        setData(data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        }
        if (deleted !== undefined) {
        setData(data.filter(appointment => appointment.id !== deleted));
        }
        setIsAppointmentBeingCreated(false);
    }, [setData, setIsAppointmentBeingCreated, data]);

    const onAddedAppointmentChange = React.useCallback((appointment) => {
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
    });


    const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
        {...restProps}
        onDoubleClick={allowAdding ? onDoubleClick : undefined}
        />
    )), [allowAdding]);

    const CommandButton = React.useCallback(({ id, ...restProps }) => {
        if (id === 'deleteButton') {
        return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
        }
        return <AppointmentForm.CommandButton id={id} {...restProps} />;
    }, [allowDeleting]);


  return (
            data.length>0?
            <React.Fragment>
        
        <Paper>
            <Scheduler
            data={data}
            height={600}
            >
            <ViewState
                defaultCurrentDate={currentDate}
                
            />
            <EditingState
                onCommitChanges={onCommitChanges}

                addedAppointment={addedAppointment}
                onAddedAppointmentChange={onAddedAppointmentChange}
            />

            <IntegratedEditing />
            <WeekView
                startDayHour={9}
                endDayHour={19}
                timeTableCellComponent={TimeTableCell}
            />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
            <Appointments />

            <AppointmentTooltip
                showOpenButton
                showDeleteButton={allowDeleting}
            />
            <AppointmentForm
                commandButtonComponent={CommandButton}
                readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
            />

            </Scheduler>
        </Paper>
        </React.Fragment>
        :<>loading ..</>
        
    );
};