class TasksController < ApplicationController
  def show
    @task = Task.find(params[:id])
  end

  def create
    @tasks = Task.all
    @task = Task.new(task_params)
    @task.user = current_user
    @task.durhours = @task.dur_hours
    if @task.save
      params[:task][:label_ids].shift
      params[:task][:label_ids].each do |label_id|
        @task.labels << Label.find(label_id)
        # TaskLabel.create(
        #   label_id: label_id,
        #   task: @task
        # )
      end
      new_label_name = params[:task][:new_label]
      @task.labels << Label.create!(name: new_label_name) if new_label_name != ""
      redirect_to '/dashboard'
    else
      flash[:alert] = 'The task already exists'
      redirect_to '/dashboard'
    end
  end

  def update
    @task = Task.find(params[:id])
    @task = Task.update(task_params)
    @task.durhours = @task.dur_hours
    redirect_to '/dashboard'
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to '/dashboard'
  end

  def mark_as_done
    @task = Task.find(params[:id])
    @work_session = WorkSession.find(params[:work_session_id])
    @task.timestamp = Time.now
    @task.done = true
    @task.save
    redirect_to work_session_path(@work_session)
  end

  def stats
    @labels = Label.all
    @tasks = Task.all
    @task_durations = @tasks.map do |task|
      if task.done == true
        [task.timestamp, task.dur_hours]
      else
        [task.timestamp, 0.0]
      end
    end
    @labeltasks = @labels.map do |label|
      [label.name, label.tasks.sum { |task| task.durhours }]
    end
  end

  private

  def task_params
    params.require(:task).permit(
      :title, :minutes, :seconds,
      labels_attributes: []
    )
  end
end
