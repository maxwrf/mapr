class PlanPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def algorithm?
    true
  end

  def create?
    true
  end

  def edit?
    true
  end

  def update?
    true
  end

  def show?
    true
  end
end
