class ActivityPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    @activities = policy_scope(Activity)
  end

  def save_shortlist?
    true
  end

  def destroy?
    true
  end
end
