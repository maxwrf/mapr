module PlansHelper
  def category_label(category)
    tag.div class: 'category-choice' do
      #concat image_tag "#{category.downcase}.jpg"
      concat tag.span category
    end
  end
end
