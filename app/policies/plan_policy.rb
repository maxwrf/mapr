class PlanPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def algorithm?
    true
  end

  def show?
    true
  end
end
